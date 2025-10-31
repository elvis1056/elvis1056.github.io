---
id: 2
slug: what-is-mvc-mvvm
title: "什麼是 MVC/MVVM"
excerpt: "了解 MVC 與 MVVM 設計模式的差異，以及前後端分離後架構演進的歷程..."
author: Elvis
imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
tags:
  - id: 21
    name: MVC
    slug: mvc
  - id: 22
    name: MVVM
    slug: mvvm
  - id: 23
    name: Architecture
    slug: architecture
  - id: 24
    name: Design Pattern
    slug: design-pattern
createdAt: "2025-01-27T10:00:00Z"
updatedAt: "2025-01-27T10:00:00Z"
---

## 名詞解釋

> MVC (Modal View Controller)

> MVVM ( Modal View View-Modal )

## 敘述

一種分類方法、一種設計模式，將資料、邏輯、顯示個別區分開來

資料層、表現層、邏輯層

## 差異點

前端 MVC 與後端 MVC 有著一個很大的差異

前端的 MVC 著重在事件流程，而後端的重點在於資料流。

後端 MVC 的 View 就相當於是前端的全部了

![MVCandMVVM](/assets/img/articles/MVCandMVVM.png)

當前後端分離後，後端幾乎不需要去處理前端 View 的部分。 相對地，後端的 V 變成前端的 M，那些原本放在後端處理畫面、邏輯的部分，有很大程度地往前端移動。

比起把原本後端的路由管理接回來用，此時前端更注重的是資料與狀態的管理，以及它們如何跟畫面的整合與同步。

於是前端框架慢慢發展成 MVVM 模式。

## 參考文章

[https://medium.com/@rayshih771012/mvc-架構演進-為什麼需要mvc-d1a13aa687a0](https://medium.com/@rayshih771012/mvc-%E6%9E%B6%E6%A7%8B%E6%BC%94%E9%80%B2-%E7%82%BA%E4%BB%80%E9%BA%BC%E9%9C%80%E8%A6%81mvc-d1a13aa687a0)

[https://kuro.tw/posts/2019/07/31/談談前端框架/](https://kuro.tw/posts/2019/07/31/%E8%AB%87%E8%AB%87%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/)

[https://blog.yyisyou.tw/1dddc6d7/](https://blog.yyisyou.tw/1dddc6d7/)
