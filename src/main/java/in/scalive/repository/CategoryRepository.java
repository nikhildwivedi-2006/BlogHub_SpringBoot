package in.scalive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.scalive.entity.Category;

public interface CategoryRepository extends JpaRepository <Category ,Long> {
   boolean existsByCatName(String catName);
}
