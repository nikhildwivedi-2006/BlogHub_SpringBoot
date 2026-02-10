package in.scalive.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.scalive.dto.CategoryRequestDTO;
import in.scalive.dto.CategoryResponseDTO;
import in.scalive.dto.CategoryUpdateDTO;
import in.scalive.service.CategoryService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories ")
public class CategoryController {
	private CategoryService cServ;

	public CategoryController(CategoryService cServ) {
		
		this.cServ = cServ;
	}
	
	@PostMapping
	public ResponseEntity <CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryRequestDTO request){
		CategoryResponseDTO response = cServ.createCategory(request);
		return new ResponseEntity<>(response , HttpStatus.CREATED);
	}
	@GetMapping
	public ResponseEntity<List<CategoryResponseDTO>> getAllCategories(){
		return ResponseEntity.ok(cServ.getAllCategories());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Long id){
		return ResponseEntity.ok(cServ.getCategoryById(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CategoryResponseDTO>updateCategory(@PathVariable Long id , @RequestBody CategoryUpdateDTO  upd ){
		return ResponseEntity.ok(cServ.updateCategory(id, upd));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String>deleteCategory(@PathVariable Long id){
		cServ.deleteCategory(id);
		return ResponseEntity.ok("category deleted successfully");
	}
	
}
