package org.wcci.transportationev.project.comparev.storage;

import org.springframework.data.repository.CrudRepository;
import org.wcci.transportationev.project.comparev.resources.ChargeCost;

public interface ChargeCostRepository extends CrudRepository<ChargeCost, Long> {

    ChargeCost findChargeCostByState(String stateName);
    
}