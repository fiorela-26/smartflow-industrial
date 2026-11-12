import React, { useState, useEffect } from 'react';

export default function App() {
  const [paginaActual, setPaginaActual] = useState('dashboard');
  const [temperatura, setTemperatura] = useState(68.4);
  const [produccion, setProduccion] = useState(1420);
  const [historialTemp, setHistorialTemp] = useState([65, 66, 67, 68, 68.4]);
  
  // Estados interactivos
  const [estaciones, setEstaciones] = useState([
    { id: 1, nombre: 'Estación de Ensamblaje A-1', estado: 'Operando', operador: 'Juan Pérez', ciclo: '98.5%' },
    { id: 2, nombre: 'Celda Robótica B-2 (Soldadura)', estado: 'Operando', operador: 'Carlos Ruiz', ciclo: '99.1%' },
    { id: 3, nombre: 'Control de Calidad Óptico C-3', estado: 'Mantenimiento', operador: 'Ana Gómez', ciclo: '88.0%' }
  ]);

  const [sensores, setSensores] = useState([
    { id: 'ESP32-01', nombre: 'Horno Industrial 02', ip: '192.168.1.50', status: 'Online', rssi: '-65 dBm' },
    { id: 'ESP32-02', nombre: 'Banda Transportadora 01', ip: '192.168.1.52', status: 'Online', rssi: '-70 dBm' },
    { id: 'ESP32-03', nombre: 'Brazo Robótico B1', ip: '192.168.1.55', status: 'Standby', rssi: '-78 dBm' }
  ]);

  const [alertas, setAlertas] = useState([
    { id: 1, hora: '17:02', tipo: 'Advertencia', mensaje: 'Temperatura en horno superó umbral preventivo de 68°C.' },
    { id: 2, hora: '17:15', tipo: 'Info', mensaje: 'Sincronización de paquetes MQTT con broker en la nube exitosa.' }
  ]);

  // Simulación automática de telemetría
  useEffect(() => {
    const interval = setInterval(() => {
      setProduccion(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleEstacion = (id) => {
    setEstaciones(estaciones.map(est => {
      if (est.id === id) {
        const nuevoEstado = est.estado === 'Operando' ? 'Mantenimiento' : 'Operando';
        return { ...est, estado: nuevoEstado };
      }
      return est;
    }));
  };

  const reiniciarSensor = (id) => {
    alert(`Comando MQTT enviado: Reiniciando nodo periférico [${id}]... ¡Operación exitosa!`);
  };

  const agregarAlerta = () => {
    const nueva = {
      id: Date.now(),
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      tipo: 'Alerta Manual',
      mensaje: 'Prueba de diagnóstico ejecutada desde el panel de control central.'
    };
    setAlertas([nueva, ...alertas]);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, -apple-system, sans-serif', background: '#090d16', color: '#f1f5f9' }}>
      
      {/* 🧭 BARRA LATERAL MODERNA */}
      <aside style={{ width: '270px', background: '#0e1626', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#f8fafc', letterSpacing: '-0.025em' }}>SmartFlow</h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '500' }}>Industrial Cloud Pro</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <button 
            onClick={() => setPaginaActual('dashboard')}
            style={{ background: paginaActual === 'dashboard' ? '#1e293b' : 'transparent', color: paginaActual === 'dashboard' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 14px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
            Dashboard Principal
          </button>
          <button 
            onClick={() => setPaginaActual('produccion')}
            style={{ background: paginaActual === 'produccion' ? '#1e293b' : 'transparent', color: paginaActual === 'produccion' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 14px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20M5 20V8h14v12M7 12h10M7 16h10"/></svg>
            Líneas de Producción
          </button>
          <button 
            onClick={() => setPaginaActual('sensores')}
            style={{ background: paginaActual === 'sensores' ? '#1e293b' : 'transparent', color: paginaActual === 'sensores' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 14px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            Sensores IoT (ESP32)
          </button>
          <button 
            onClick={() => setPaginaActual('reportes')}
            style={{ background: paginaActual === 'reportes' ? '#1e293b' : 'transparent', color: paginaActual === 'reportes' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 14px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Reportes & Alertas
          </button>
        </nav>

        <div style={{ background: '#131d31', border: '1px solid #1e293b', padding: '14px', borderRadius: '10px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #34d399' }}></span>
            <span style={{ color: '#34d399', fontWeight: '600' }}>HiveMQ Broker Online</span>
          </div>
          <span style={{ color: '#64748b' }}>Cloud 11 Hackathon • v2.5</span>
        </div>
      </aside>

      {/* 🖥️ CONTENIDO PRINCIPAL */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        
        {/* ================= DASHBOARD PRINCIPAL ================= */}
        {paginaActual === 'dashboard' && (
          <div>
            <header style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
              <div>
                <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700', color: '#f8fafc' }}>Dashboard Analítico</h1>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Monitoreo en tiempo real de telemetría industrial y rendimiento IoT.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', background: '#111827', border: '1px solid #1f2937', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: '#94a3b8', alignItems: 'center' }}>
                <span>⏱️ Modo:</span>
                <strong style={{ color: '#38bdf8' }}>Tiempo Real (Live)</strong>
              </div>
            </header>

            {/* Simulación Interactiva de Temperatura */}
            <div style={{ background: 'linear-gradient(135deg, #111827, #1e293b)', border: '1px solid #334155', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: '14px', display: 'block', marginBottom: '2px' }}>Simulador de Prueba IoT (Horno 02)</strong>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Mueve la barra para probar la respuesta visual de alertas de temperatura.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#38bdf8', fontWeight: '600' }}>{temperatura} °C</span>
                <input 
                  type="range" 
                  min="50" 
                  max="90" 
                  step="0.5"
                  value={temperatura} 
                  onChange={(e) => {
                    const val = +e.target.value;
                    setTemperatura(val);
                    setHistorialTemp(prev => [...prev.slice(1), val]);
                  }}
                  style={{ cursor: 'pointer', accentColor: '#38bdf8' }}
                />
              </div>
            </div>

            {/* Tarjetas de Métricas (4 Columnas Modernas) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>EFICIENCIA OEE</span>
                  <span style={{ background: '#065f46', color: '#34d399', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>+1.2%</span>
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '700', color: '#38bdf8' }}>94.8%</h2>
                <div style={{ width: '100%', background: '#1f2937', height: '4px', borderRadius: '2px' }}>
                  <div style={{ width: '94.8%', background: '#38bdf8', height: '100%', borderRadius: '2px' }}></div>
                </div>
              </div>

              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>PRODUCCIÓN TOTAL</span>
                  <span style={{ background: '#0284c7', color: '#fff', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>Turno A</span>
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '700', color: '#f8fafc' }}>{produccion} <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '400' }}>unid</span></h2>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Meta diaria: 1,800 unid</span>
              </div>

              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>TEMPERATURA HORNO</span>
                  <span style={{ background: temperatura > 72 ? '#7f1d1d' : '#065f46', color: temperatura > 72 ? '#fca5a5' : '#34d399', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>{temperatura > 72 ? 'Alto Riesgo' : 'Normal'}</span>
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '700', color: temperatura > 72 ? '#ef4444' : '#fbbf24' }}>{temperatura} °C</h2>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Umbral máximo: 75°C</span>
              </div>

              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>CONSUMO ENERGÉTICO</span>
                  <span style={{ background: '#31105c', color: '#c084fc', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>Eco</span>
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '700', color: '#c084fc' }}>42.6 kW</h2>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Ahorro del 8.4% vs ayer</span>
              </div>
            </div>

            {/* Gráfica y Estado de Nodos */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '24px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', color: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>📈 Historial de Temperatura (Telemetría en Vivo)</span>
                  <span style={{ fontSize: '12px', color: '#38bdf8', background: '#1e293b', padding: '4px 8px', borderRadius: '6px' }}>Actualización Automática</span>
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '170px', padding: '10px 0', borderBottom: '1px solid #1f2937' }}>
                  {historialTemp.map((val, idx) => {
                    const altura = Math.min(Math.max((val / 90) * 100, 15), 100);
                    return (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>{val}°</span>
                        <div style={{ width: '32px', height: `${altura}%`, background: val > 72 ? '#ef4444' : '#38bdf8', borderRadius: '6px 6px 0 0', transition: 'height 0.3s ease' }}></div>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>T-{5 - idx}s</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '24px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#f8fafc' }}>⚡ Estado de Redes IoT</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ background: '#161e2e', padding: '12px', borderRadius: '8px', border: '1px solid #1f2937' }}>
                    <span style={{ color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Broker MQTT Cloud</span>
                    <strong style={{ color: '#34d399' }}>HiveMQ (Estable)</strong>
                  </div>
                  <div style={{ background: '#161e2e', padding: '12px', borderRadius: '8px', border: '1px solid #1f2937' }}>
                    <span style={{ color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Latencia de Red</span>
                    <strong style={{ color: '#38bdf8' }}>31 ms</strong>
                  </div>
                  <div style={{ background: '#161e2e', padding: '12px', borderRadius: '8px', border: '1px solid #1f2937' }}>
                    <span style={{ color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Nodos Conectados</span>
                    <strong style={{ color: '#f8fafc' }}>3 / 3 Activos</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= LÍNEAS DE PRODUCCIÓN ================= */}
        {paginaActual === 'produccion' && (
          <div>
            <header style={{ marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700', color: '#f8fafc' }}>Gestión de Líneas de Producción</h1>
              <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>Control interactivo de celdas robóticas y estaciones de ensamblaje.</p>
            </header>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {estaciones.map((est) => (
                <div key={est.id} style={{ background: '#111827', border: '1px solid #1f2937', padding: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '18px', fontWeight: '600' }}>{est.nombre}</h3>
                    <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', fontSize: '13px' }}>
                      <span>👤 Operador: <strong style={{ color: '#cbd5e1' }}>{est.operador}</strong></span>
                      <span>⚙️ Ciclo de trabajo: <strong style={{ color: '#38bdf8' }}>{est.ciclo}</strong></span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleEstacion(est.id)}
                    style={{ 
                      background: est.estado === 'Operando' ? '#065f46' : '#78350f', 
                      color: est.estado === 'Operando' ? '#34d399' : '#fbbf24', 
                      border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' 
                    }}>
                    ● {est.estado} (Cambiar)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SENSORES IoT ================= */}
        {paginaActual === 'sensores' && (
          <div>
            <header style={{ marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700', color: '#f8fafc' }}>Sensores y Módulos IoT (ESP32)</h1>
              <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>Monitoreo de red inalambrica y comandos de reinicio por MQTT.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {sensores.map((sen) => (
                <div key={sen.id} style={{ background: '#111827', border: '1px solid #1f2937', padding: '24px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <strong style={{ color: '#38bdf8', fontSize: '15px' }}>{sen.id}</strong>
                    <span style={{ background: '#065f46', color: '#34d399', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{sen.status}</span>
                  </div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '16px' }}>{sen.nombre}</h4>
                  <p style={{ margin: '0 0 6px 0', color: '#94a3b8', fontSize: '13px' }}>Dirección IP: <code style={{ color: '#cbd5e1' }}>{sen.ip}</code></p>
                  <p style={{ margin: '0 0 20px 0', color: '#94a3b8', fontSize: '13px' }}>Señal Wi-Fi (RSSI): <strong style={{ color: '#cbd5e1' }}>{sen.rssi}</strong></p>
                  <button 
                    onClick={() => reiniciarSensor(sen.id)}
                    style={{ width: '100%', background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                    🔄 Reiniciar Nodo por MQTT
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= REPORTES Y ALERTAS ================= */}
        {paginaActual === 'reportes' && (
          <div>
            <header style={{ marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700', color: '#f8fafc' }}>Reportes e Incidencias</h1>
                <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>Registro en vivo de eventos críticos y bitácora de seguridad SST.</p>
              </div>
              <button 
                onClick={agregarAlerta}
                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                ➕ Simular Alerta Nueva
              </button>
            </header>

            <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {alertas.map((alt) => (
                <div key={alt.id} style={{ background: '#161e2e', padding: '16px', borderRadius: '10px', borderLeft: `4px solid ${alt.tipo === 'Advertencia' ? '#f59e0b' : '#38bdf8'}`, borderTop: '1px solid #1f2937', borderRight: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: alt.tipo === 'Advertencia' ? '#fbbf24' : '#38bdf8', fontWeight: '600', fontSize: '13px' }}>{alt.tipo}</span>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{alt.hora}</span>
                  </div>
                  <span style={{ color: '#f8fafc', fontSize: '14px' }}>{alt.mensaje}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}