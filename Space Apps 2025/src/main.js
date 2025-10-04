import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = `
  <div class="layout">

    <!-- Left Sidebar -->
    <aside class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>Dashboard</li>
        <li>Inversion</li>
        <li>Empleados</li>
        <li>Ubicación</li>
        <li>Settings</li>
        <li>Payment</li>
        <li>Accounts</li>
        <li>Help</li>
      </ul>
    </aside>

    <div class="main-area">

      <!-- Top Toolbar -->
      <header class="toolbar">
        <div class="logo-title">
          <img src="${viteLogo}" class="logo small" alt="Vite logo" />
          <span>Food Orders Dashboard</span>
        </div>
        <div class="toolbar-right">
          <input type="search" placeholder="Search…" />
          <img src="${javascriptLogo}" class="logo small" alt="User icon" />
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="content">
        <section class="card stats">
          <h2>Revenue</h2>
          <p>IDR <strong>7,852,000</strong></p>
          <p class="green">+2.1% vs last week</p>
        </section>

        <section class="card orders">
          <h2>Order Time</h2>
          <div class="chart"></div>
          <p>Afternoon: 40% | Evening: 32% | Morning: 28%</p>
        </section>

        <section class="card rating">
          <h2>Your Rating</h2>
          <ul>
            <li>Hygiene: 85%</li>
            <li>Packaging: 92%</li>
            <li>Food Taste: 85%</li>
          </ul>
        </section>

        <section class="card list">
          <h2>Most Ordered Food</h2>
          <ul>
            <li>Fresh Salad Bowl</li>
            <li>Chicken Noodles</li>
            <li>Smoothie Fruits</li>
            <li>Hot Chicken Wings</li>
          </ul>
        </section>
      </main>

    </div>
  </div>
`
