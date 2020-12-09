package com.kuhak.controller.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class KuhakControllerAppConfig {

	private static final String BASE_PACKAGE = "com.kuhak.controller.rest";

	@Bean
	public Docket swaggerClientApi() {
		return new Docket(DocumentationType.SWAGGER_2).groupName("Client").select()
				.apis(RequestHandlerSelectors.basePackage(BASE_PACKAGE))
				.paths(PathSelectors.regex("/api/.*")).build()
				.apiInfo(new ApiInfoBuilder().version("1.0").title("Internal API").build());
	}
}
