package com.example.backend_final.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@ToString
@Getter
@Setter
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String fileName;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;

    public Image(String fileName) {
        this.fileName = fileName;
    }
}
