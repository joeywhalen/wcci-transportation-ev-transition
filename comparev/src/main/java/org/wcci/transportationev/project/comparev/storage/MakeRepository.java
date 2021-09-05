package org.wcci.transportationev.project.comparev.storage;

import org.springframework.data.repository.CrudRepository;
import org.wcci.transportationev.project.comparev.resources.Make;

public interface MakeRepository extends CrudRepository<Make, Long> {
    
}