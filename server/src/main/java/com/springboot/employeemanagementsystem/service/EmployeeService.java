package com.springboot.employeemanagementsystem.service;

import java.util.List;

import com.springboot.employeemanagementsystem.entity.Employee;

public interface EmployeeService {

    public List<Employee> getEmployees();

    public Employee getEmployeeById(String id);

    public Employee addEmployee(Employee employee);

    public Employee updateEmployee(String id, Employee employee);

    public Employee deleteEmployee(String id);

}
