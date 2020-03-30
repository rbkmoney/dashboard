# Примеры использования

## Простая панель

```html
<dsh-panel>
    <dsh-panel-header>
        Some test
    </dsh-panel-header>
</dsh-panel>
```

## Задание цвета

```html
<dsh-panel color="primary">
    <dsh-panel-header>
        Some test
    </dsh-panel-header>
</dsh-panel>
```

Поддерживаемые цвета: `primary`, `accent`

## Использование иконки

```html
<dsh-panel>
    <dsh-panel-header>
        <div fxLayout="row" fxLayoutAlign="space-between">
            <div>Some text</div>
            <dsh-panel-header-icon icon="save"></dsh-panel-header-icon>
        </div>
    </dsh-panel-header>
</dsh-panel>
```

## Задание контента

```html
<dsh-panel>
    <dsh-panel-header>
        Some text
    </dsh-panel-header>
    <dsh-panel-content>Content</dsh-panel-content>
</dsh-panel>
```
