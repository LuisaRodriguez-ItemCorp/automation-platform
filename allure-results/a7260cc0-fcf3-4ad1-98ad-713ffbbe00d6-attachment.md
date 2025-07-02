# Page snapshot

```yaml
- banner:
  - link:
    - /url: /home
    - img
  - textbox "Search documents, vendors, etc."
  - button "user-switch":
    - img "user-switch"
  - button "product":
    - img "product"
  - button "logout":
    - img "logout"
- main:
  - navigation:
    - list:
      - listitem:
        - link "home":
          - /url: /home
          - img "home"
      - listitem:
        - link "Demo":
          - /url: /home/demo
  - main:
    - img
    - heading "Document Data Extraction Demo Tool" [level=2]
    - button "inbox Click or drag file to this area to upload":
      - paragraph:
        - img "inbox"
      - paragraph: Click or drag file to this area to upload
    - img "loading"
    - text: jetbrains Y2017_06.pdf
    - button "delete":
      - img "delete"
    - progressbar
```