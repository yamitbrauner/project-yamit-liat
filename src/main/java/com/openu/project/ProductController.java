package com.openu.project;

import java.util.concurrent.atomic.AtomicLong;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class ProductController {
//
//
//    @GetMapping("/products")
//    public ArrayList<Product> product(@RequestParam(value = "name", defaultValue = "orange") String name) {
//        ArrayList<Product> list = new ArrayList<Product>();
//        if(name != ""){
//            list.add(new Product(4,"orange"));
//        }else{
//            list.add(new Product(1,"aa"));
//            list.add(new Product(2,"bb"));
//            list.add(new Product(3,"cc"));
//        }
//        return list;
//    }
//}