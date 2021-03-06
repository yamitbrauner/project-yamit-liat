package com.openu.project.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "Purchase")
public class Purchase {

    @Id
    @Column(name = "purchase_id")
    @SequenceGenerator(name="seq_purchase",sequenceName="SEQ_PURCHASE", allocationSize=1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq_purchase")
    private int purchaseId;

    @Column(name = "prod_id")
    private int prodId;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "reservation_id")
    private int reservationId;

    @Column(name = "quantity")
    private int quantity;

    public int getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(int purchaseId) {
        this.purchaseId = purchaseId;
    }

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

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
