import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import { PetTypes } from 'src/app/models/petTypes.model';
import { PetTypesService } from 'src/app/services/pet-types.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pets: Pet[] = [];
  pet: Pet = new Pet();
  isEditForm = false;
  isEditing = false;

  types: PetTypes[] = []

  constructor(private petService: PetService, private petTypesService: PetTypesService) { }

  ngOnInit(): void {
    this.loadPets();
    this.loadPetTypes();
  }

  loadPets(): void {
    this.petService.getAllPets().subscribe(
      (data: Pet[]) => this.pets = data,
      (error: any) => console.error(error)
    );
  }

  loadPetTypes(): void {
    this.petTypesService.getAllPetTypes().subscribe(
      (data: PetTypes[]) => this.types = data,
      (error: any) => console.error(error)
    );
  }

  onSubmit(): void {
    if (this.isEditForm) {
      this.updatePet();
    } else {
      this.createPet();
    }
  }

  createPet(): void {
    this.petService.createPet(this.pet).subscribe(
      (data: Pet) => {
        this.pets.push(data);
        this.resetPet();
      },
      (error: any) => console.error(error)
    );
  }

  updatePet(): void {
    this.petService.updatePet(this.pet.id!, this.pet).subscribe(
      (data: Pet) => {
        const index = this.pets.findIndex(p => p.id === data.id);
        this.pets[index] = data;
        this.resetPet();
      },
      (error: any) => console.error(error)
    );
  }

  editPet(pet: Pet): void {
    this.pet = { ...pet };
    this.isEditing = true;
}

  deletePet(id: number): void {
    this.petService.deletePet(id).subscribe(
      () => {
        this.pets = this.pets.filter(p => p.id !== id);
      },
      (error: any) => console.error(error)
    );
  }

  resetPet(): void {
    this.pet = new Pet();
  }

  openEditForm(pet: Pet): void {
    this.pet = { ...pet };
    this.isEditForm = true;
  }
}

