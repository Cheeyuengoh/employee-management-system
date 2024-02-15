package com.springboot.employeemanagementsystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springboot.employeemanagementsystem.entity.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
}