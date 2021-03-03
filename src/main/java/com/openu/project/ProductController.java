package com.openu.project;

import java.util.concurrent.atomic.AtomicLong;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/products")
    public ArrayList<Product> product(@RequestParam(value = "name", defaultValue = "World") String name) {
        ArrayList<Product> list = new ArrayList<Product>();
        list.add(new Product(1,"aa"));
        list.add(new Product(2,"bb"));
        list.add(new Product(3,"cc"));

        //return new Product(counter.incrementAndGet(), String.format(template, name));
        return list;
    }
}