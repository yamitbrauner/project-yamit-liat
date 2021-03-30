package com.openu.project.Controller;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class TestImage {

//    @GetMapping(value = "/image")
//    public @ResponseBody
//    InputStream getImage() throws IOException {
//        InputStream in = getClass().getResourceAsStream("/com/openu/project/produceimage/matokli.png");
////        byte[] buffer;
////        return IOUtils.readFully(in,buffer);
////        return IOUtils.toByteArray(in);
//        return in;
//    }
    //@GetMapping (path = "/ photoProduit / {id}", produces = org.springframework.http.MediaType.IMAGE_PNG_VALUE)
    @GetMapping(value = "/image")
    public byte [] getPhoto (@RequestParam String name) throws IOException {
        String image_db = "C:/Users/LIAT_ARAMA/Desktop/liat_op/matok_li/Pictures_matokli/Cakes/";
        String image_path = image_db + name;
        System.out.println(image_path);
        return Files.readAllBytes (Paths.get (image_path));
    }
}
