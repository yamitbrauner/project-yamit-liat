package com.openu.project.Controller;

import com.openu.project.business.service.DeliveryService;
import com.openu.project.business.service.ImageService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class ImageController {
    @Autowired
    private ImageService imageService;

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
    public byte [] getPhoto (@RequestParam String name, @RequestParam String category) throws IOException {
        return imageService.getPhotoService(name, category);
    }
}