package com.openu.project.controller;

import com.openu.project.business.service.ImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageController {
    @Autowired
    private ImageService imageService;
    @GetMapping(value = "/public/getImage")
    public byte [] getPhoto (@RequestParam String name, @RequestParam String category) throws IOException {
        return imageService.getPhotoService(name, category);
    }

    @PostMapping(value = "/admin/saveImage", consumes = "multipart/form-data")
    public void saveImage(@RequestParam MultipartFile multipartImage, @RequestParam Integer category) throws IOException {
        multipartImage.getName();
        String originalFilename = multipartImage.getOriginalFilename();
        // Todo: check return value
        this.imageService.savePhotoService(multipartImage.getBytes(), originalFilename, category.toString());
    }
}