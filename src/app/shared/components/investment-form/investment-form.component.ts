import { Component, OnInit, input, output, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { Investment, CreateInvestmentRequest, UpdateInvestmentRequest } from '../../../core/interfaces/investment.interface';

@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  template: `
    <div class="investment-form p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isEditing() ? 'Editar Inversión' : 'Nueva Inversión' }}
        </h2>
        <button 
          mat-icon-button 
          (click)="onCancel.emit()"
          class="text-gray-500 hover:text-gray-700"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="investmentForm" (ngSubmit)="submitForm()" class="space-y-4">
        <!-- Symbol -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Símbolo</mat-label>
          <input 
            matInput 
            formControlName="symbol" 
            placeholder="Ej: AAPL, TSLA"
            maxlength="10"
          >
          @if (investmentForm.get('symbol')?.hasError('required')) {
            <mat-error>
              El símbolo es requerido
            </mat-error>
          }
          @if (investmentForm.get('symbol')?.hasError('minlength')) {
            <mat-error>
              El símbolo debe tener al menos 2 caracteres
            </mat-error>
          }
        </mat-form-field>

        <!-- Name -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nombre</mat-label>
          <input 
            matInput 
            formControlName="name" 
            placeholder="Ej: CEDEAR APPLE INC"
          >
          @if (investmentForm.get('name')?.hasError('required')) {
            <mat-error>
              El nombre es requerido
            </mat-error>
          }
        </mat-form-field>

        <!-- Type -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Tipo</mat-label>
          <mat-select formControlName="type">
            <mat-option value="CEDEAR">CEDEAR</mat-option>
            <mat-option value="ACCION">Acción</mat-option>
            <mat-option value="CRIPTO">Cripto</mat-option>
          </mat-select>
          @if (investmentForm.get('type')?.hasError('required')) {
            <mat-error>
              El tipo es requerido
            </mat-error>
          }
        </mat-form-field>

        <!-- Quantity -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Cantidad</mat-label>
          <input 
            matInput 
            type="number" 
            formControlName="quantity" 
            placeholder="0.00"
            step="0.01"
            min="0"
          >
          @if (investmentForm.get('quantity')?.hasError('required')) {
            <mat-error>
              La cantidad es requerida
            </mat-error>
          }
          @if (investmentForm.get('quantity')?.hasError('min')) {
            <mat-error>
              La cantidad debe ser mayor a 0
            </mat-error>
          }
        </mat-form-field>

        <!-- Last Price -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Último Precio</mat-label>
          <input 
            matInput 
            type="number" 
            formControlName="lastPrice" 
            placeholder="0.00"
            step="0.01"
            min="0"
          >
          @if (investmentForm.get('lastPrice')?.hasError('required')) {
            <mat-error>
              El precio es requerido
            </mat-error>
          }
          @if (investmentForm.get('lastPrice')?.hasError('min')) {
            <mat-error>
              El precio debe ser mayor a 0
            </mat-error>
          }
        </mat-form-field>

        <!-- Cost Per Share -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Precio Promedio de Compra</mat-label>
          <input 
            matInput 
            type="number" 
            formControlName="costPerShare" 
            placeholder="0.00"
            step="0.01"
            min="0"
          >
          @if (investmentForm.get('costPerShare')?.hasError('required')) {
            <mat-error>
              El precio de compra es requerido
            </mat-error>
          }
          @if (investmentForm.get('costPerShare')?.hasError('min')) {
            <mat-error>
              El precio de compra debe ser mayor a 0
            </mat-error>
          }
        </mat-form-field>

        <!-- Daily Variation Percent (Optional) -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Variación Diaria (%)</mat-label>
          <input 
            matInput 
            type="number" 
            formControlName="dailyVariationPercent" 
            placeholder="0.00"
            step="0.01"
          >
        </mat-form-field>

        <!-- Daily Variation Amount (Optional) -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Variación Diaria ($)</mat-label>
          <input 
            matInput 
            type="number" 
            formControlName="dailyVariationAmount" 
            placeholder="0.00"
            step="0.01"
          >
        </mat-form-field>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <button 
            type="button" 
            mat-button 
            (click)="onCancel.emit()"
            class="px-6"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            mat-raised-button 
            color="primary"
            [disabled]="investmentForm.invalid || loading()"
            class="px-6"
          >
            @if (loading()) {
              <mat-spinner diameter="20" class="mr-2"></mat-spinner>
            }
            {{ isEditing() ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .investment-form {
      max-width: 600px;
      margin: 0 auto;
    }
    
    mat-form-field {
      margin-bottom: 16px;
    }
    
    .form-actions {
      border-top: 1px solid #e5e7eb;
      padding-top: 24px;
    }
  `]
})
export class InvestmentFormComponent implements OnInit {
  investment = input<Investment | null>(null);
  loading = input<boolean>(false);
  onSubmit = output<CreateInvestmentRequest | UpdateInvestmentRequest>();
  onCancel = output<void>();

  investmentForm!: FormGroup;
  isEditing = signal<boolean>(false);

  private readonly fb = inject(FormBuilder);
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.investmentForm = this.fb.group({
      symbol: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required]],
      type: ['CEDEAR', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0.01)]],
      lastPrice: ['', [Validators.required, Validators.min(0.01)]],
      costPerShare: ['', [Validators.required, Validators.min(0.01)]],
      dailyVariationPercent: [''],
      dailyVariationAmount: ['']
    });
  }

  private populateForm(investment: Investment): void {
    if (!this.investmentForm) {
      this.initForm();
    }

    this.investmentForm.patchValue({
      symbol: investment.symbol,
      name: investment.name,
      type: investment.type,
      quantity: investment.quantity,
      lastPrice: investment.lastPrice,
      costPerShare: investment.costPerShare,
      dailyVariationPercent: investment.dailyVariationPercent || '',
      dailyVariationAmount: investment.dailyVariationAmount || ''
    });
  }

  submitForm(): void {
    if (this.investmentForm.valid) {
      const formValue = this.investmentForm.value;
      
      // Convertir números a string para la API
      const investmentData = {
        ...formValue,
        quantity: formValue.quantity.toString(),
        lastPrice: formValue.lastPrice.toString(),
        costPerShare: formValue.costPerShare.toString(),
        dailyVariationPercent: formValue.dailyVariationPercent ? formValue.dailyVariationPercent.toString() : undefined,
        dailyVariationAmount: formValue.dailyVariationAmount ? formValue.dailyVariationAmount.toString() : undefined
      };

      this.onSubmit.emit(investmentData);
    }
  }
}
