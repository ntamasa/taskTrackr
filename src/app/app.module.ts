import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { FilterComponent } from './components/filter/filter.component';
import { BtnComponent } from './components/btn/btn.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TodoMessageComponent } from './components/todo-message/todo-message.component';
import { TodoMessageFormComponent } from './components/todo-message-form/todo-message-form.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarComponent } from './components/calendar/calendar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DayTemplateComponent } from './components/day-template/day-template.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavigationItemComponent,
    FooterComponent,
    LogoComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    PageHeadingComponent,
    FilterComponent,
    BtnComponent,
    TodoItemComponent,
    TodoListComponent,
    ErrorMessageComponent,
    TodoMessageComponent,
    TodoMessageFormComponent,
    CreateTaskFormComponent,
    CalendarComponent,
    FavouritesComponent,
    DayTemplateComponent,
    SearchbarComponent,
    NotFoundComponent,
    TodosPageComponent,
    DatePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
