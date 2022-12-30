package com.example.backend_final.controller;

import com.example.backend_final.dto.BookDto;
import com.example.backend_final.dto.ImageDto;
import com.example.backend_final.error.BookNotFoundException;
import com.example.backend_final.model.Book;
import com.example.backend_final.payload.response.BookResp;
import com.example.backend_final.payload.response.MessageResp;
import com.example.backend_final.repository.BookRepo;
import com.example.backend_final.service.BookService;
import com.example.backend_final.service.ImageStorageService;
import com.example.backend_final.util.Mapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private Mapper mapper;
    @Autowired
    private BookRepo bookRepo;

    @PostMapping("/save")
    public @Valid ResponseEntity<?> saveBook(
            @RequestParam(name="title", required = true)  String title ,
            @RequestParam(name="author", required = true) String author,
            @RequestParam(name="description", required = true)String description,
            @RequestParam(name="dateRelease", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateRelease,
            @RequestParam(name="totalPage", required = true) int totalPage,
            @RequestParam(name="typeBook", required = true) String typeBook,
            @RequestParam(name="price", required = true) float price,
            @RequestParam(name="image", required = true) MultipartFile[] images
    ) {

        BookDto bookDto = new BookDto();
        bookDto.setTitle(title);
        bookDto.setAuthor(author);
        bookDto.setDescription(description);
        bookDto.setTypeBook(typeBook);
        bookDto.setTotalPage(totalPage);
        bookDto.setDateRelease(dateRelease);
        bookDto.setPrice(price);

        List<ImageDto> imageList = Arrays.stream(images).map(item ->
                        new ImageDto(imageStorageService.storeFile(item)))
                .collect(Collectors.toList());
        bookDto.setImageList(imageList);
        System.out.println(bookDto);
        return  ResponseEntity.ok().body(new MessageResp(HttpStatus.OK, "", mapper.toBookDto(bookService.save(mapper.toBook(bookDto)))));
    }

    @PostMapping("/saveTest")
    public ResponseEntity<?> saveBookTest(
            @RequestPart(name = "book")
            String bookRequest,
            @RequestParam(name="image", required = true) MultipartFile[] images
    ) throws JsonProcessingException {
        System.out.println(bookRequest);
//        ObjectMapper objectMapper = new ObjectMapper();
//        BookRequest bookRequest1 = new BookRequest();
//        bookRequest1 = objectMapper.readValue(bookRequest, BookRequest.class);
//        System.out.println(bookRequest1);
//        List<ImageDto> imageList = Arrays.stream(images).map(item ->
//                        new ImageDto(imageStorageService.storeFile(item)))
//                .collect(Collectors.toList());
//        bookDto.setImageList(imageList);
//        System.out.println(bookDto);
        return  ResponseEntity.ok().body(bookRequest);
    }

    @PutMapping("detail/update/{id}")
    public ResponseEntity<?> updateBook(
            @PathVariable("id") Long id,
            @RequestParam(name="title", required = true)  String title ,
            @RequestParam(name="author", required = true) String author,
            @RequestParam(name="description", required = true)String description,
            @RequestParam(name="dateRelease", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateRelease,
            @RequestParam(name="totalPage", required = true) int totalPage,
            @RequestParam(name="typeBook", required = true) String typeBook,
            @RequestParam(name="price", required = true) float price,
            @RequestParam(name="image", required = true) MultipartFile[] images
    ) throws BookNotFoundException {
        BookDto bookDto = new BookDto();
        bookDto.setTitle(title);
        bookDto.setAuthor(author);
        bookDto.setDescription(description);
        bookDto.setTypeBook(typeBook);
        bookDto.setTotalPage(totalPage);
        bookDto.setDateRelease(dateRelease);
        bookDto.setPrice(price);

        List<ImageDto> imageList = Arrays.stream(images).map(item ->
                        new ImageDto(imageStorageService.storeFile(item)))
                .collect(Collectors.toList());
        bookDto.setImageList(imageList);
        return  ResponseEntity.ok().body(new MessageResp(HttpStatus.OK, "", mapper.toBookDto(bookService.updateBook(id,bookDto))));
    }

    @DeleteMapping("/remove-book/{id}")
    public ResponseEntity<?> deleteFileImage(@PathVariable("id") Long id){
        bookService.deleteById(id);
        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"Delete book successfully!!!", ""));
    }


    @DeleteMapping("/remove-image/{filename}")
    public ResponseEntity<?> deleteFileImage(@PathVariable("filename") String fileName){
        imageStorageService.deleteFile(fileName);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDetailBook(@PathVariable("id") Long id) throws BookNotFoundException {
//        Book book = bookService.findById(id).orElseThrow(() -> new BookNotFoundException("Can not found book with bookId: " + id));
//        return ResponseEntity.ok(mapper.toBookDto(book));
        Optional<Book> book = bookService.findById(id);
        if(book.isPresent()){
            return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"", mapper.toBookDto(book.get())));
        }

        return ResponseEntity.notFound().build();
    }


    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
                                          @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                                          @RequestParam(value = "sortBy",defaultValue = "title") String sortBy,
                                         @RequestParam(value = "keyword", required = false) String keyword){
        Pageable paging = PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
        if(keyword == null){
            Page<Book> bookPage = bookService.findAll(paging);
        }
        else{
            Page<Book> bookPage = bookService.findBookByKeyword(keyword,paging);
        }
        Page<Book> bookPage = bookService.findAll(paging);
        List<Book> bookList = bookPage.getContent();

        List<BookDto> bookDtoList = bookList.stream().map(b -> mapper.toBookDto(b)).collect(Collectors.toList());
        BookResp bookResp = new BookResp();
        bookResp.setBookDtoList(bookDtoList);
        bookResp.setPageNo(bookPage.getNumber());
        bookResp.setPageSize(bookPage.getSize());
        bookResp.setTotalElements(bookPage.getTotalElements());
        bookResp.setTotalPages(bookPage.getTotalPages());
        bookResp.setLast(bookPage.isLast());
        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"", bookResp));
    }

//    @GetMapping("/{keyword}")
//    public ResponseEntity<?> getAllBooks(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
//                                         @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
//                                         @RequestParam(value = "sortBy",defaultValue = "title") String sortBy,
//                                         @PathVariable("keyword") String keyword){
//        Pageable paging = PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
//        Page<Book> bookPage = bookService.findBookByKeyword(keyword,paging);
//        List<Book> bookList = bookPage.getContent();
//
//        List<BookDto> bookDtoList = bookList.stream().map(b -> mapper.toBookDto(b)).collect(Collectors.toList());
//        BookResp bookResp = new BookResp();
//        bookResp.setBookDtoList(bookDtoList);
//        bookResp.setPageNo(bookPage.getNumber());
//        bookResp.setPageSize(bookPage.getSize());
//        bookResp.setTotalElements(bookPage.getTotalElements());
//        bookResp.setTotalPages(bookPage.getTotalPages());
//        bookResp.setLast(bookPage.isLast());
//        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"", bookResp));
//    }

    @GetMapping("/image/{fileName:.+}")
    // /files/06a290064eb94a02a58bfeef36002483.png
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
        try {
            byte[] bytes = imageStorageService.readFileContent(fileName);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        }catch (Exception exception) {
            return ResponseEntity.noContent().build();
        }
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageResp> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(new MessageResp(HttpStatus.BAD_REQUEST,"Validation Failed", errors));
    }
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<MessageResp> handleConstrainValidationExceptions(SQLIntegrityConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        System.out.println(ex.getMessage());
        System.out.println(ex.getCause());
        return ResponseEntity.badRequest().body(new MessageResp(HttpStatus.BAD_REQUEST,"Validation Failed", ex.getMessage()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<MessageResp> handleConstraintViolationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach((error) -> {
            errors.put(String.valueOf(error.getPropertyPath()), error.getMessageTemplate());
        });
        return ResponseEntity.badRequest().body(new MessageResp(HttpStatus.BAD_REQUEST,"Validation Failed", errors));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<MessageResp> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        Map<String, String> errors = new HashMap<>();
        System.out.println(ex.toString());
        return ResponseEntity.badRequest().body(new MessageResp(HttpStatus.BAD_REQUEST,"Validation Failed", ex.getMessage()));
    }

}
