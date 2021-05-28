package com.openu.project.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "prod_id")
    @GeneratedValue(generator="seq_product")
    @SequenceGenerator(name="seq_product",sequenceName="SEQ_PRODUCT", allocationSize=1)
    private int prodId;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "prod_name")
    private String prodName;

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

    public int getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(int quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public float getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(float pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }
}