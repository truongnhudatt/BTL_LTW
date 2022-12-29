package com.example.backend_final.security.config;

import com.example.backend_final.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    @Bean
//    public JwtAthFilter jwtAthFilter() {
//        return new JwtAthFilter();
//    }

    @Autowired
    private JwtAthFilter jwtAthFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();

        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);

        return authenticationProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and()
                .csrf().disable().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().authorizeRequests()
//                .requestMatchers("/api/v*/users/**").permitAll()
//                .requestMatchers("/api/v*/books/**").hasAnyAuthority("USER")
//                .requestMatchers("/api/v*/orders/**").hasAnyAuthority("USER")
//                .requestMatchers("/api/v*/reviews/**").hasAnyAuthority("USER")
//                .requestMatchers("/api/v*/bills/**").hasAnyAuthority("USER")
                .requestMatchers("/api/v*/users/**").permitAll()
                .requestMatchers("/api/v*/books/all").permitAll()
                .requestMatchers("/api/v*/books/save").permitAll()
                .requestMatchers("/api/v*/books/detail/**").permitAll()
//                .requestMatchers("/api/v*/books/save").access("hasAnyAuthority('ADMIN')")
                .requestMatchers("/api/v*/books/image/**").permitAll()
                .requestMatchers("/api/v*/orders/**").access("hasAnyAuthority('USER') or hasAnyAuthority('ADMIN')")
                .requestMatchers("/api/v*/reviews/create").access("hasAnyAuthority('USER') or hasAnyAuthority('ADMIN')")
                .requestMatchers("/api/v*/reviews/book/**").permitAll()
                .requestMatchers("/api/v*/carts/all").permitAll()
                .requestMatchers("/api/v*/bills/**").access("hasAnyAuthority('USER') or hasAnyAuthority('ADMIN')")

                .anyRequest().authenticated();

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/images/**");
    }
}