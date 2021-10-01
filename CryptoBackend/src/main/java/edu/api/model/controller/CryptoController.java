package edu.api.model.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.api.model.entity.Crypto;
import edu.api.model.entity.DollarPrice;
import edu.api.model.security.enums.CryptoName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("auth/api")
@CrossOrigin
public class CryptoController {

    @Autowired
    RestTemplate restTemplate;

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/cryptos")
    public List<Crypto> getCryptos() throws JsonProcessingException {
        List<Crypto> crypts = new ArrayList<>();
        for(CryptoName crypto : CryptoName.values()){
            Crypto active = restTemplate.getForObject("https://api1.binance.com/api/v3/ticker/price?symbol="+ crypto,Crypto.class);
            active.setPrice(active.getPrice() * this.dollarPrice().getV());
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            active.setLastUpdate(dtf.format(LocalDateTime.now()));
            crypts.add(active);
        }
        return crypts;
    }

    @GetMapping("/crypts")
    public List<Crypto> getCrypts() throws JsonProcessingException {
        List<Crypto> crypts = new ArrayList<>();
        ResponseEntity<List<Crypto>> all = restTemplate.exchange("https://api1.binance.com/api/v3/ticker/price",HttpMethod.GET,null, new ParameterizedTypeReference<List<Crypto>>() {});
        List<Crypto> result = all.getBody();
        List<Crypto> finish = result.stream().filter(x -> Arrays.stream(CryptoName.values()).anyMatch(c -> c.toString().equals(x.getSymbol()))).collect(Collectors.toList());
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        finish.forEach(x-> x.setLastUpdate(dtf.format(LocalDateTime.now())));
        DollarPrice dolar = this.dollarPrice();
        finish.forEach(x-> x.setPrice(x.getPrice() * dolar.getV()));
        return finish;
    }

    @GetMapping(value = "/cryptos/{name}")
    public Crypto getCrypto(@PathVariable("name") String name) throws JsonProcessingException {
        Crypto active = restTemplate.getForObject("https://api1.binance.com/api/v3/ticker/price?symbol="+ name,Crypto.class);
        active.setPrice(active.getPrice() * this.dollarPrice().getV());
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        active.setLastUpdate(dtf.format(LocalDateTime.now()));
        return active;
    }


    @GetMapping(value = "/dolar")
    public DollarPrice dollarPrice() throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjQ0OTI5NjMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqZXJlbWlhc2Z1ZW50ZXM3N0BnbWFpbC5jb20ifQ.gHHz2GFOfB8BRJBq-vWCK4Fh4LdDfozeG-Pg9bfc4YwQr-sR1Nc-Phy3m3BBjTK1DKAVEdRAlz_pGk-UGUvHwg");
        HttpEntity<String> entity = new HttpEntity(headers);
        ResponseEntity<List<DollarPrice>> dollarPrices = restTemplate.exchange("https://api.estadisticasbcra.com/usd_of", HttpMethod.GET,entity, new ParameterizedTypeReference<List<DollarPrice>>() {});
        List<DollarPrice> response = dollarPrices.getBody();
        DollarPrice dolar = response.get(response.size()-1);
        return dolar;
    }

}
