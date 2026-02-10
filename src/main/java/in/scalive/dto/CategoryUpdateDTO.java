package in.scalive.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryUpdateDTO {
	
	private String catName;
	private String descr;
}
