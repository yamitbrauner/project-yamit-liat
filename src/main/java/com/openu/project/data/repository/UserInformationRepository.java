package com.openu.project.data.repository;

import com.openu.project.data.entity.UserInformation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInformationRepository extends CrudRepository<UserInformation,Integer>{
}
