package com.springboot.employeemanagementsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.employeemanagementsystem.entity.Employee;
import com.springboot.employeemanagementsystem.repository.EmployeeRepository;
import com.springboot.employeemanagementsystem.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).get();
    }

    @SuppressWarnings("null")
    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @SuppressWarnings("null")
    @Override
    public Employee updateEmployee(String id, Employee employee) {
        System.out.println(id);
        Employee updateEmployee = employeeRepository.findById(id).get();
        updateEmployee.setFirstName(employee.getFirstName());
        updateEmployee.setLastName(employee.getLastName());
        updateEmployee.setEmail(employee.getEmail());
        return employeeRepository.save(updateEmployee);
    }

    @SuppressWarnings("null")
    @Override
    public Employee deleteEmployee(String id) {
        Employee employee = employeeRepository.findById(id).get();
        employeeRepository.delete(employee);
        return employee;
    }

}
