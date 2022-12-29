package com.example.backend_final.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

@Service
public interface ImageStorageService {
     String storeFile(MultipartFile file);
     Stream<Path> loadAll(); //load all file inside a folder
     byte[] readFileContent(String fileName);
     void deleteAllFiles();
    void deleteFile(String fileName);
}
