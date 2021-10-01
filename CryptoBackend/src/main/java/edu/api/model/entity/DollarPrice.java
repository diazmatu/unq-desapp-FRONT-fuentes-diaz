package edu.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DollarPrice {
    private String d;
    private Float v;

    public String getD() {
        return d;
    }

    public void setD(String d) {
        this.d = d;
    }

    public Float getV() {
        return v;
    }

    public void setV(Float v) {
        this.v = v;
    }
}
