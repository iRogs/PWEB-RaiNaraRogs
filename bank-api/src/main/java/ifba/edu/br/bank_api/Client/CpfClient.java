package ifba.edu.br.bank_api.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("validador-cpf")
public interface CpfClient {
    
    @GetMapping("/validar-cpf")
    ResponseEntity<String> validar(@RequestParam("cpf") String cpf);

}