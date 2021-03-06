package com.openu.project.business.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CronTasksService {
    @Autowired
    ReservationService reservationService;

    @Scheduled(fixedRate = 30000)
    public void cronJobSchMailing() {
        this.reservationService.sendMailToApprovedOrder();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        Date now = new Date();
        String strDate = sdf.format(now);
        System.out.println("Mailing cron job :: " + strDate);
    }
}
