const command = document.querySelector('#demo-command');
const output = document.querySelector('#demo-output');
const status = document.querySelector('#demo-status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileDemo = document.querySelector('#mobile-demo');

function playExample() {
  for (const element of [command, output]) {
    element.getAnimations().forEach(animation => animation.cancel());
  }
  if (reducedMotion.matches) return;

  command.animate(
    [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0)' }],
    { duration: 540, easing: 'steps(23, end)' },
  );
  output.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { delay: 540, duration: 160, fill: 'backwards' },
  );
}

document.querySelector('#run-demo').addEventListener('click', () => {
  playExample();
  status.textContent = 'Example output shows Gi0/1 is administratively down.';
});

document.querySelector('#copy-demo').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(command.textContent);
    status.textContent = 'Command copied.';
  } catch {
    status.textContent = 'Select the command text to copy it.';
  }
});

document.querySelector('#demo-actions').hidden = false;
playExample();

if (!reducedMotion.matches) {
  mobileDemo.play().catch(() => {
    // The native controls remain available when autoplay is blocked.
  });
}
reducedMotion.addEventListener('change', event => {
  if (event.matches) mobileDemo.pause();
});
