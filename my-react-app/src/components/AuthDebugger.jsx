import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { getRedirectResult } from 'firebase/auth';

function AuthDebugger() {
    const [logs, setLogs] = useState([]);

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { timestamp, message, type }]);
        console.log(`[${timestamp}] ${message}`);
    };

    useEffect(() => {
        addLog('AuthDebugger mounted');
        addLog(`User Agent: ${navigator.userAgent}`);

        const checkRedirect = async () => {
            try {
                addLog('Checking for redirect result...');
                const result = await getRedirectResult(auth);

                if (result) {
                    addLog(`✅ Redirect successful: ${result.user.email}`, 'success');
                } else {
                    addLog('No redirect result (normal on initial load)');
                }
            } catch (error) {
                addLog(`❌ Redirect error: ${error.code} - ${error.message}`, 'error');
            }
        };

        checkRedirect();
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflow: 'auto',
            background: '#1a1a1a',
            color: '#fff',
            padding: '10px',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 9999,
            borderTop: '2px solid #4CAF50'
        }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                🔍 Auth Debug Console
            </div>
            {logs.map((log, i) => (
                <div key={i} style={{
                    padding: '2px 0',
                    color: log.type === 'error' ? '#ff5252' : log.type === 'success' ? '#4CAF50' : '#fff'
                }}>
                    [{log.timestamp}] {log.message}
                </div>
            ))}
        </div>
    );
}

export default AuthDebugger;
