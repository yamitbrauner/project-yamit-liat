package com.openu.project.business.service;

import com.openu.project.exception.exceptionsList.FileAlreadyExist;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ImageService {
    String imageDbPath = "C:/db/pic_matok/";
    public byte[] getPhotoService(String name, String category) throws IOException {
        String image_path = imageDbPath + category + '/' + name;

        byte[] image;
        if (Files.exists(Paths.get(image_path)))
        {
            try {
                image = Files.readAllBytes(Paths.get(image_path));
            } catch (Exception e) {
                System.out.println(e.getMessage());
                throw e;
            }
        }
        else
        {
            try {
                String imageNotFoundPath =  imageDbPath + "/not_found.png";
                image = Files.readAllBytes(Paths.get(imageNotFoundPath));
            } catch (Exception e) {
                System.out.println(e.getMessage());
                throw e;
            }
        }
        return image;
    }


    public boolean savePhotoService(byte[] image, String imageName, String category) throws IOException {
        String image_path = imageDbPath + category + '/' + imageName;
        if (Files.exists(Paths.get(image_path))) throw new FileAlreadyExist();

        try {
            Files.write(Paths.get(image_path), image);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}