package edu.api.model.security.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class RegisterUser {
    @NotBlank
    private String name;
    @NotBlank
    private String userName;
    @Email
    private String email;
    @NotBlank
    private String password;
    private Set<String> rols = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRols() {
        return rols;
    }

    public void setRols(Set<String> roles) {
        this.rols = rols;
    }
}
