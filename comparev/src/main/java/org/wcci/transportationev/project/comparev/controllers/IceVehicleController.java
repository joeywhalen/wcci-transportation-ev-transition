package org.wcci.transportationev.project.comparev.controllers;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.wcci.transportationev.project.comparev.resources.GasPrice;
import org.wcci.transportationev.project.comparev.resources.IceVehicle;
import org.wcci.transportationev.project.comparev.resources.Make;
import org.wcci.transportationev.project.comparev.resources.Model;
import org.wcci.transportationev.project.comparev.resources.Year;
import org.wcci.transportationev.project.comparev.storage.GasPriceRepository;
import org.wcci.transportationev.project.comparev.storage.IceVehicleStorage;
import org.wcci.transportationev.project.comparev.storage.MakeStorage;
import org.wcci.transportationev.project.comparev.storage.ModelStorage;
import org.wcci.transportationev.project.comparev.storage.YearStorage;

@RestController
public class IceVehicleController {

    private GasPriceRepository gasPriceRepository;
    private YearStorage yearStorage;
    private MakeStorage makeStorage;
    private ModelStorage modelStorage;
    private IceVehicleStorage iceVehicleStorage;

    public IceVehicleController(GasPriceRepository gasPriceRepository, YearStorage yearStorage, MakeStorage makeStorage,
            ModelStorage modelStorage, IceVehicleStorage iceVehicleStorage) {

        this.gasPriceRepository = gasPriceRepository;
        this.yearStorage = yearStorage;
        this.makeStorage = makeStorage;
        this.modelStorage = modelStorage;
        this.iceVehicleStorage = iceVehicleStorage;
    }

    // GET http://localhost:8080/api/ice/years
    @GetMapping("/api/ice/years")
    public Iterable<Year> retrieveAllYears() {
        return yearStorage.retrieveAllYears();
    }

    // GET http://localhost:8080/api/ice/years/2012
    @GetMapping("/api/ice/years/{year}")
    public Iterable<Make> retrieveAllMakesByYear(@PathVariable int year) {
        Year currentYear = yearStorage.retrieveMakesByYear(year);
        return currentYear.getMakes();
    }

    // GET http://localhost:8080/api/ice/years/2012/ford
    @GetMapping("/api/ice/years/{year}/{make}")
    public Iterable<Model> retrieveModelsByYearAndMake(@PathVariable int year, @PathVariable String make) {

        Year currentYear = yearStorage.retrieveMakesByYear(year);
        Collection<Make> currentMakes = currentYear.getMakes();
        Make makeToReturn = null;

        for (Make currentMake : currentMakes) {
            if (currentMake.getMakeName().toLowerCase().equals(make)) {
                makeToReturn = currentMake;
            }
        }
        Collection<Model> modelsToReturn = makeToReturn.getModels();

        return modelsToReturn;
    }

    // GET http://localhost:8080/api/ice/states
    @GetMapping("/api/ice/states")
    public Iterable<GasPrice> retrieveAllStates() {
        return gasPriceRepository.findAll();
    }

    // GET http://localhost:8080/api/ice/userVehicle/Alaska
    @GetMapping("/api/ice/userVehicle/{stateId}")
    public GasPrice retrieveUserStateById(@PathVariable String stateId) {
        Long id = Long.parseLong(stateId);
        return gasPriceRepository.findById(id).get();
    }

    // GET http://localhost:8080/api/ice/userVehicle/186/188/190
    @GetMapping("api/ice/userVehicle/{userYearId}/{userMakeId}/{userModelId}")
    public IceVehicle retrieveUserIceVehicleByYearIdMakeIdModelId(@PathVariable String userYearId,
            @PathVariable String userMakeId, @PathVariable String userModelId) {

        Long yearId = Long.parseLong(userYearId);
        Long makeId = Long.parseLong(userMakeId);

        Collection<IceVehicle> vehiclesToSort = iceVehicleStorage.retrieveIceVehiclesByModelId(userModelId);
        IceVehicle vehicleToReturn = new IceVehicle();

        for (IceVehicle vehicle : vehiclesToSort) {
            if (vehicle.getYearId().toString().equals(userYearId)) {
                vehicleToReturn = vehicle;
            }
        }
        return vehicleToReturn;
    }
}