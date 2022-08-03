# FrontendLbd
TODO list using Angular framework.

## Componenet vs Service vs Module
`Component` jest jakby widokiem (zawiera logike oraz kod html), który jest wyświetlany dla użytkownika.

`Service` służy głównie do jako miejsce wymiany/przechowywania danych.

`Module` posiada wiele Component oraz Service

## Component
### 1. Odwoływanie do pola z HTMLa (pozyskiwanie elementu)
Dodajemy w HTMLu `#nazwa`
```html
<input #todoInput>
```
A w ts możemy pozyskać poprzez:
```ts
@ViewChild('todoInput') todoInput;

// wstrzykiwanie
constructor(todoInput: ElementRef) {
    this.todoInput = todoInput;
}
```

### 2. Akcje typu OnClick
W HTMLu bindujemy event:
```html
<button (click)="onClick()">Click</button>
```
w ts tworzymy event:
```ts
public onClickAdd() {
    console.log("Click!");
}
```

### 3. Przekazywanie danych z jednego Component (z HTML) do drugiego Component

*app.component.html*
```html
<mat-list-item *ngFor="let todo of getTodoList">

    <app-todo-item-component [todoIn]="todo"></app-todo-item-component>

</mat-list-item>
```

*app.component.ts*
```ts
// todoList from service available here :). It is not callable (its 'get' accessor so just call it as variable! noice)
get getTodoList() {
    return this.todosService.getTodoList();
};
```

*todo-item.component.ts*
```ts
@Input("todoIn") public todo : Todo = {name: "", done: false};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
