# El formulario de contacto de la web

Cuando alguien rellena el formulario de `omioatelier.com/contacto`, la web envía
un correo al buzón de OMIO. Hasta julio de 2026 **no enviaba nada**: mostraba
"gracias" y el mensaje se perdía.

## Cómo llega el correo

- Sale del propio servidor de correo de OMIO (LucusHost), no de un servicio externo.
- Llega al buzón configurado en `CONTACTO_DESTINO`.
- El remitente es el buzón de la web; **el "responder" va al cliente**, así que
  se le contesta directamente desde el correo de aviso.

## Configuración (variables de entorno en Railway)

| Variable | Qué es | Ejemplo |
|---|---|---|
| `SMTP_HOST` | Servidor de correo | `mail.omioatelier.com` |
| `SMTP_PORT` | Puerto: `465` (cifrado directo) o `587` (STARTTLS) | `465` |
| `SMTP_USER` | Buzón desde el que sale el aviso | `web@omioatelier.com` |
| `SMTP_PASS` | Su contraseña | — |
| `CONTACTO_DESTINO` | Buzón que recibe las consultas | `hola@omioatelier.com` |
| `CONTACTO_REMITENTE` | Opcional. Cómo se ve el remitente | `Web OMIO <web@omioatelier.com>` |

Si falta alguna, el envío falla con un error que **dice qué variable falta**, y
la web muestra al visitante el correo de contacto como alternativa en vez de
fingir que se ha enviado.

Conviene usar un buzón propio para la web (`web@`) y no el personal de nadie:
si algún día hay que cambiar la contraseña, no se rompe el correo de una persona.

## Protecciones

- **Campo trampa** (invisible): si un bot lo rellena, se le responde que todo
  fue bien pero no se envía nada. Así no aprende a evitarlo.
- **Validación en el servidor**: nombre, correo con forma de correo y mensaje
  son obligatorios; hay límites de longitud por campo.
- **Sin inyección de cabeceras**: los saltos de línea se limpian del asunto.

## Cómo comprobar que sigue funcionando

```bash
pnpm test     # incluye una prueba que levanta un servidor de correo real
```

Para una prueba de punta a punta con la web arrancada, ver
`.claude/skills/verify`.

## Datos de contacto que se publican

El correo, el teléfono y la ubicación **se editan desde el panel**
(`/keystatic` → Sección Contacto), sin tocar código. Si el teléfono se deja
vacío, ese bloque no aparece en la página — mejor sin teléfono que con uno
que no contesta.
