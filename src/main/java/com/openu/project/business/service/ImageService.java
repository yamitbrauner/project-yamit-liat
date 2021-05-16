package com.openu.project.business.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ImageService {
    String imageDbPath = "C:/db/pic_matok/";
    String imageNotFoundPath =  imageDbPath + "/not_found.png";
    public byte[] getPhotoService(String name, String category) throws IOException {
        String image_path = imageDbPath + category + '/' + name;
        //System.out.println(image_path);
        byte[] image;
        try{
            image = Files.readAllBytes(Paths.get(image_path));
        } catch (Exception e)
        {
            image = Files.readAllBytes(Paths.get(imageNotFoundPath));
        }
        return image;
    }


    public boolean savePhotoService(byte[] image, String imageName, String category) throws IOException {
        String image_path = imageDbPath + category + '/' + imageName;
        //System.out.println(image_path);
        try {
            Files.write(Paths.get(image_path), image);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}