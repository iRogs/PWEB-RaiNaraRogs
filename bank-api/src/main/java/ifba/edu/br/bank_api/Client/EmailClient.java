package ifba.edu.br.bank_api.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@FeignClient("emailservice")
public interface EmailClient {
    @RequestMapping(method = RequestMethod.POST,value = "/sendmail" )
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO dto);
    
}
