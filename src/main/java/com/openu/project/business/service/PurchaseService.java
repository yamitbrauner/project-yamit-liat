package com.openu.project.business.service;

import com.openu.project.business.domain.ProductsForCartDto;
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

    public Iterable<Purchase> getPurchase() {
        return purchaseRepository.findAll();
    }

    public float getProductsSumByReservationId(int reservationId) {

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


    public void updatePurchasedProductsInStock(int reservationId)
    {
        Iterable<Purchase> purchases = this.purchaseRepository.findByReservationId(reservationId);
        Iterator<Purchase> purchaseIterator =  purchases.iterator();

        Purchase currPurchase;
        while (purchaseIterator.hasNext())
        {
            currPurchase = purchaseIterator.next();
            this.productService.incProductQuantity(currPurchase.getProdId(),
                    -1 * currPurchase.getQuantity());
        }
    }

    public void addNewPurchase(Purchase newPurchase) {
        this.purchaseRepository.save(newPurchase);
    }


    public ArrayList<ProductsForCartDto> getProductsByReservation(int reservationId) {
        Iterable<Purchase> purchases = this.purchaseRepository.findByReservationId(reservationId);
        ArrayList<ProductsForCartDto> productsForCarts = new ArrayList<ProductsForCartDto>();

        Iterator<Purchase> purchaseIterator = purchases.iterator();
        while (purchaseIterator.hasNext())
        {
            Purchase currPurchase = purchaseIterator.next();
            ProductsForCartDto currProduct = new ProductsForCartDto();
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
