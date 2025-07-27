package br.com.biblioteca.gateway;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource; // <-- Adicionar este import


@EnableDiscoveryClient
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public CorsWebFilter corsWebFilter() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(Arrays.asList("*")); // Permite todas as origens (bom para dev)
		corsConfig.setMaxAge(3600L); // Tempo de cache da resposta de sondagem
		corsConfig.addAllowedMethod("*"); // Permite todos os métodos (GET, POST, etc.)
		corsConfig.addAllowedHeader("*"); // Permite todos os cabeçalhos (incluindo Authorization)

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig); // Aplica a configuração a todos os paths

		return new CorsWebFilter(source);
	}

}
