package com.openu.project.data.entity;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "prod_id")
    @SequenceGenerator(name="seq_product",sequenceName="SEQ_PRODUCT", allocationSize=1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq_product")
    private int prodId;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "prod_name")
    private String prodName;

    @Column(name = "quantity_ordered")
    private int quantityOrdered;

    @Column(name = "quantity_in_stock")
    private int quantityInStock;

    @Column(name = "price_per_unit")
    private float pricePerUnit;

    @Column(name = "description")
    private String description;

    @Column(name = "pic_url")
    private String picUrl;

    public int getProdId() {
        return prodId;
    }

    public void setProdId(int prodId) {
        this.prodId = prodId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public int getQuantityOrdered() {
        return quantityOrdered;
    }

    public void setQuantityOrdered(int quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    public int getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(int quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public float getPrice_per_unit() {
        return pricePerUnit;
    }

    public void setPrice_per_unit(float price_per_unit) {
        this.pricePerUnit = pricePerUnit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPic_url() {
        return picUrl;
    }

    public void setPic_url(String pic_url) {
        this.picUrl = pic_url;
    }
}

