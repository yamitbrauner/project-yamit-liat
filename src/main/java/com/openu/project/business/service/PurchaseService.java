package com.openu.project.business.service;

import com.openu.project.business.domain.ProductsForCart;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Purchase;
import com.openu.project.data.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    ProductService productService;


    public float getProuductsSumByReservationId(int reservationId) {

        Iterable<Purchase> purchases = this.purchaseRepository.findByReservationId(reservationId);
        Iterator<Purchase> purchaseIterator =  purchases.iterator();

        float totalSum = 0;
        Purchase currPurchase;
        while (purchaseIterator.hasNext())
        {
            currPurchase = purchaseIterator.next();
            float itemPrice = this.productService.getProductByProduct(currPurchase.getProdId()).getPricePerUnit() ;
            totalSum += currPurchase.getQuantity() * itemPrice;

        }
        return totalSum;
    }

    public void addNewPurchase(Purchase newPurchase) {
        // TODO: Add checkers
        //newPurchase.setPurchaseId();
//        Purchase dupPurchase = new Purchase();
//        dupPurchase.setReservationId(newPurchase.getReservationId());
//        dupPurchase.setQuantity(newPurchase.getQuantity());
        this.purchaseRepository.save(newPurchase);
    }


    public ArrayList<ProductsForCart> getProductsByReservation(int reservationId) {
        Iterable<Purchase> purchases = this.purchaseRepository.findByReservationId(reservationId);
        ArrayList<ProductsForCart> productsForCarts = new ArrayList<ProductsForCart>();

        Iterator<Purchase> purchaseIterator = purchases.iterator();
        while (purchaseIterator.hasNext())
        {
            Purchase currPurchase = purchaseIterator.next();
            ProductsForCart currProduct = new ProductsForCart();
            Product product = this.productService.getProductByProduct(currPurchase.getProdId());
            currProduct.setProdName(product.getProdName());
            currProduct.setPricePerUnit(product.getPricePerUnit());
            currProduct.setQuantity(currPurchase.getQuantity());
            currProduct.setTotalPrice(product.getPricePerUnit() * currProduct.getQuantity());
            productsForCarts.add(currProduct);
        }
        return productsForCarts;
    }
}
