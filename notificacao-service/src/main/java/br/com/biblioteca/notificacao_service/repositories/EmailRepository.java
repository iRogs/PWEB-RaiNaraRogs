package br.com.biblioteca.notificacao_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.biblioteca.notificacao_service.entities.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
}