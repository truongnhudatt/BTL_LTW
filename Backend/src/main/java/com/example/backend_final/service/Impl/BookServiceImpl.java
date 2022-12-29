package com.example.backend_final.service.Impl;

import com.example.backend_final.dto.BookDto;
import com.example.backend_final.error.BookNotFoundException;
import com.example.backend_final.model.Book;
import com.example.backend_final.repository.BookRepo;
import com.example.backend_final.repository.ImageRepo;
import com.example.backend_final.service.BookService;
import com.example.backend_final.service.ImageStorageService;
import com.example.backend_final.util.Mapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Transactional
@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private ImageRepo imageRepo;
    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private Mapper mapper;

    @Autowired
    private ImageStorageService imageStorageService;

    @Override
    public <S extends Book> S save(@Valid S entity) {
        return bookRepo.save(entity);
    }

    @Override
    public Optional<Book> findById(Long aLong) {
        return bookRepo.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return bookRepo.existsById(aLong);
    }

    @Override
    public long count() {
        return bookRepo.count();
    }

    @Override
    public void deleteById(Long aLong) {
//        Book book = bookRepo.findById(aLong).orElseThrow();
//        book.getImageList().forEach(img -> imageStorageService.deleteFile(img.getFileName()));
        bookRepo.deleteById(aLong);
    }

    @Override
    public void delete(Book entity) {
        bookRepo.delete(entity);
    }

    @Override
    public Page<Book> findAll(Pageable pageable) {
        return bookRepo.findAll(pageable);
    }

    @Override
    @Modifying
    public Book updateBook(Long id, BookDto bookDto) throws BookNotFoundException {
        Book bookTmp = bookRepo.findById(id)
                            .orElseThrow(() ->
                                            new BookNotFoundException("Can not found book with bookId: " + id));
        Book book = mapper.toBook(bookDto);
        if(Objects.nonNull(book.getTitle()) && !"".equalsIgnoreCase(book.getTitle())){
            bookTmp.setTitle(book.getTitle());
        }
        if(Objects.nonNull(book.getAuthor()) && !"".equalsIgnoreCase(book.getAuthor())){
            bookTmp.setAuthor(book.getAuthor());
        }
        if(Objects.nonNull(book.getTypeBook()) && !"".equalsIgnoreCase(book.getTypeBook())){
            bookTmp.setTypeBook(book.getTypeBook());
        }
        if(Objects.nonNull(book.getDescription()) && !"".equalsIgnoreCase(book.getDescription())){
            bookTmp.setDescription(book.getDescription());
        }
        if(Objects.nonNull(book.getDateRelease()) && !"".equalsIgnoreCase(book.getDateRelease().toString())){
            bookTmp.setDateRelease(book.getDateRelease());
        }
        if(Objects.nonNull(book.getPrice()) && book.getPrice().floatValue() > 0){
            bookTmp.setPrice(book.getPrice());
        }
        if(Objects.nonNull(book.getTotalPage()) && book.getTotalPage() > 0){
            bookTmp.setTotalPage(book.getTotalPage());
        }
        if(Objects.nonNull(book.getImageList()) && book.getImageList().size() > 0){
            imageRepo.deleteImageBook(bookTmp.getId());
//            bookTmp.getImageList().stream().forEach(item -> imageStorageService.deleteFile(item.getFileName()));
            bookTmp.setImageList(book.getImageList());
            bookTmp.getImageList().forEach(item -> item.setBook(bookTmp));
        }
        return bookRepo.save(bookTmp);
    }

    @Override
    public boolean existsByTitle(String title) {
        return bookRepo.existsByTitle(title);
    }


}
