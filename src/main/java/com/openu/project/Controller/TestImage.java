//package com.openu.project.Controller;
//
//import org.apache.tomcat.util.http.fileupload.IOUtils;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.IOException;
//import java.io.InputStream;
//
//@RestController
//public class TestImage {
//
//    @GetMapping(value = "/image")
//    public @ResponseBody
//    byte[] getImage() throws IOException {
//        InputStream in = getClass().getResourceAsStream("/com/openu/project/produceimage/matokli.png");
//        return IOUtils.toByteArray(in);
//    }
//}
