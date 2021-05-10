package com.openu.project.business.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ImageService {
    public byte[] getPhotoService(String name, String category) throws IOException {
        String image_db = "C:/db/pic_matok/";
        String image_path = image_db + category + '/' + name;
        System.out.println(image_path);
        return Files.readAllBytes(Paths.get(image_path));
    }


    public boolean savePhotoService(byte[] image, String imageName, String category) throws IOException {
        String image_db = "C:/db/pic_matok/";
        String image_path = image_db + category + '/' + imageName;
        System.out.println(image_path);
        try {
            Files.write(Paths.get(image_path), image);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}