package org.wcci.transportationev.project.comparev.storage;

import org.springframework.data.repository.CrudRepository;
import org.wcci.transportationev.project.comparev.resources.Year;

public interface YearRepository extends CrudRepository<Year, Long> {

    Year findByYear(int year);
}