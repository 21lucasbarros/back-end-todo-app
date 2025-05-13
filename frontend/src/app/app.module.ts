import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
@NgModule({
  declarations: [AppComponent, ItemComponent, AdminUsuariosComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
