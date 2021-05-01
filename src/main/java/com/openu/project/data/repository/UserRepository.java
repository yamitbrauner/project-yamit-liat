package com.openu.project.data.repository;

import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<Users,Integer> {
//    Iterable<Users> findByUserName(String userName);
    Iterable<Users> findByMail(String mail);
    Iterable<Users> findByTempHash(String tempHash);

}