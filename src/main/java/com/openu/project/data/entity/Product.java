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
    private String prod_name;

    @Column(name = "quantity_ordered")
    private int quantity_ordered;

    @Column(name = "quantity_in_stock")
    private int quantityInStock;

    @Column(name = "price_per_unit")
    private float price_per_unit;

    @Column(name = "description")
    private String description;

    @Column(name = "pic_url")
    private String pic_url;

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

    public String getProd_name() {
        return prod_name;
    }

    public void setProd_name(String prod_name) {
        this.prod_name = prod_name;
    }

    public int getQuantity_ordered() {
        return quantity_ordered;
    }

    public void setQuantity_ordered(int quantity_ordered) {
        this.quantity_ordered = quantity_ordered;
    }

    public int getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(int quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public float getPrice_per_unit() {
        return price_per_unit;
    }

    public void setPrice_per_unit(float price_per_unit) {
        this.price_per_unit = price_per_unit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPic_url() {
        return pic_url;
    }

    public void setPic_url(String pic_url) {
        this.pic_url = pic_url;
    }
}

